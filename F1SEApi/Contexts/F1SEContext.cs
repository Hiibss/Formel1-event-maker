namespace F1SEApi.Contexts;
using F1SEApi.Models;

using Microsoft.EntityFrameworkCore;

public class F1SEContext : DbContext
{
    public F1SEContext(DbContextOptions<F1SEContext> options) : base(options)
    {
        
    }

    public DbSet<Driver> Drivers { get; set; } // DbSet en liste av objekter av klassen Driver. Drivers er navnet på tabellen i databasen
    public DbSet<RaceResult> RaceResults { get; set; } // DbSet en liste av objekter av klassen RaceResult. RaceResults er navnet på tabellen i databasen

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
// Konfigurerer relasjon mellom Driver, RaceResult og Driver1
        modelBuilder.Entity<Driver>()
        .HasMany(d => d.RaceResultsAsDriver1) 
        .WithOne(rr => rr.Driver1)
        .HasForeignKey(rr => rr.DriverId1)
        .OnDelete(DeleteBehavior.Restrict); 

        modelBuilder.Entity<Driver>()
        .HasMany(d => d.RaceResultsAsDriver2)
        .WithOne(rr => rr.Driver2)
        .HasForeignKey(rr => rr.DriverId2)
        .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<RaceResult>()
        .HasOne(rr => rr.Winner)
        .WithMany(d => d.RaceWins)
        .HasForeignKey(rr => rr.WinnerId)
        .OnDelete(DeleteBehavior.Restrict);



    }
}
