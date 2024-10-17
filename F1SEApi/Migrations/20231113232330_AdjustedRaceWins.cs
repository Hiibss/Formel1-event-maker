using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1SEApi.Migrations
{
    /// <inheritdoc />
    public partial class AdjustedRaceWins : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WinCount",
                table: "Drivers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RaceResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DriverId1 = table.Column<int>(type: "INTEGER", nullable: false),
                    DriverId2 = table.Column<int>(type: "INTEGER", nullable: false),
                    WinnerId = table.Column<int>(type: "INTEGER", nullable: false),
                    WinnerId1 = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RaceResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RaceResults_Drivers_DriverId1",
                        column: x => x.DriverId1,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RaceResults_Drivers_DriverId2",
                        column: x => x.DriverId2,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RaceResults_Drivers_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RaceResults_Drivers_WinnerId1",
                        column: x => x.WinnerId1,
                        principalTable: "Drivers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RaceResults_DriverId1",
                table: "RaceResults",
                column: "DriverId1");

            migrationBuilder.CreateIndex(
                name: "IX_RaceResults_DriverId2",
                table: "RaceResults",
                column: "DriverId2");

            migrationBuilder.CreateIndex(
                name: "IX_RaceResults_WinnerId",
                table: "RaceResults",
                column: "WinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_RaceResults_WinnerId1",
                table: "RaceResults",
                column: "WinnerId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RaceResults");

            migrationBuilder.DropColumn(
                name: "WinCount",
                table: "Drivers");
        }
    }
}
