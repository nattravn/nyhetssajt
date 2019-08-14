using Microsoft.EntityFrameworkCore.Migrations;

namespace Nyhetssajt.Migrations.Custom
{
    public partial class AddedColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Info",
                table: "Customs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RssURL",
                table: "Customs",
                type: "nvarchar(250)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Info",
                table: "Customs");

            migrationBuilder.DropColumn(
                name: "RssURL",
                table: "Customs");
        }
    }
}
