﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApp.API.Data;
using NotesApp.API.Models;

namespace NotesApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes.ToListAsync();
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // POST: api/Notes
        [HttpPost]
        public async Task<ActionResult<Note>> CreateNote([FromBody] Note note)
        {
            note.CreatedAt = DateTime.Now;
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }

        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            var existingNote = await _context.Notes.FindAsync(id);
            if (existingNote == null)
            {
                return NotFound();
            }

            existingNote.Title = note.Title;
            existingNote.Description = note.Description;
            existingNote.UpdatedAt = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}