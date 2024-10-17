using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1SEApi.Migrations
{
    /// <inheritdoc />
    public partial class FixDriverRaceResultsRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RaceResults_Drivers_WinnerId1",
                table: "RaceResults");

            migrationBuilder.DropIndex(
                name: "IX_RaceResults_WinnerId1",
                table: "RaceResults");

            migrationBuilder.DropColumn(
                name: "WinnerId1",
                table: "RaceResults");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WinnerId1",
                table: "RaceResults",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RaceResults_WinnerId1",
                table: "RaceResults",
                column: "WinnerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_RaceResults_Drivers_WinnerId1",
                table: "RaceResults",
                column: "WinnerId1",
                principalTable: "Drivers",
                principalColumn: "Id");
        }
    }
}
