using Microsoft.EntityFrameworkCore.Migrations;

namespace Nyhetssajt.Migrations.Custom
{
    public partial class ChangedColumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RssURL",
                table: "Customs",
                newName: "Rss");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rss",
                table: "Customs",
                newName: "RssURL");
        }
    }
}
