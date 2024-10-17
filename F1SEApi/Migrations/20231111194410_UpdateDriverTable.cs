using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1SEApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDriverTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Races");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.AddColumn<string>(
                name: "CarImage",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlagImage",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Manufacturer",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WinnerName",
                table: "Drivers",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarImage",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "FlagImage",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Manufacturer",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "WinnerName",
                table: "Drivers");

            migrationBuilder.CreateTable(
                name: "Races",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GrandPrix = table.Column<string>(type: "TEXT", nullable: true),
                    NumberOfLaps = table.Column<int>(type: "INTEGER", nullable: false),
                    WinnerName = table.Column<string>(type: "TEXT", nullable: true),
                    WinnerTime = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Races", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Driver1 = table.Column<string>(type: "TEXT", nullable: true),
                    Driver2 = table.Column<string>(type: "TEXT", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    Manufacturer = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                });
        }
    }
}
