using Microsoft.EntityFrameworkCore.Migrations;

namespace Nyhetssajt.Migrations
{
    public partial class noCharSpecForText : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "Expressens",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "Expressens",
                type: "nvarchar(500)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
