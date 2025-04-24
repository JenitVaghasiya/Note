using Microsoft.EntityFrameworkCore;
using NotesApp.API.Models;

namespace NotesApp.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Note entity
            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            });

            // Seed data with fixed dates (not DateTime.Now)
            // var fixedDate = new DateTime(2025, 4, 24, 12, 0, 0);

            //modelBuilder.Entity<Note>().HasData(
            //    new Note
            //    {
            //        Id = 1,
            //        Title = "\Note",
            //        Description = "Welcome to the Notes App! This is your first note.",
            //        CreatedAt = fixedDate
            //    },
            //    new Note
            //    {
            //        Id = 2,
            //        Title = "How to use",
            //        Description = "You can create, edit, and delete notes using the buttons provided.",
            //        CreatedAt = fixedDate.AddMinutes(5)
            //    }
            //);
        }
    }
}