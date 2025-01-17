﻿// <auto-generated />
using F1SEApi.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace F1SEApi.Migrations
{
    [DbContext(typeof(F1SEContext))]
    partial class F1SEContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.13");

            modelBuilder.Entity("F1SEApi.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Age")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CarImage")
                        .HasColumnType("TEXT");

                    b.Property<string>("FlagImage")
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsProfessional")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nationality")
                        .HasColumnType("TEXT");

                    b.Property<int>("WinCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("WinnerName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("F1SEApi.Models.RaceResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DriverId1")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DriverId2")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WinnerId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DriverId1");

                    b.HasIndex("DriverId2");

                    b.HasIndex("WinnerId");

                    b.ToTable("RaceResults");
                });

            modelBuilder.Entity("F1SEApi.Models.RaceResult", b =>
                {
                    b.HasOne("F1SEApi.Models.Driver", "Driver1")
                        .WithMany("RaceResultsAsDriver1")
                        .HasForeignKey("DriverId1")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("F1SEApi.Models.Driver", "Driver2")
                        .WithMany("RaceResultsAsDriver2")
                        .HasForeignKey("DriverId2")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("F1SEApi.Models.Driver", "Winner")
                        .WithMany("RaceWins")
                        .HasForeignKey("WinnerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Driver1");

                    b.Navigation("Driver2");

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("F1SEApi.Models.Driver", b =>
                {
                    b.Navigation("RaceResultsAsDriver1");

                    b.Navigation("RaceResultsAsDriver2");

                    b.Navigation("RaceWins");
                });
#pragma warning restore 612, 618
        }
    }
}
