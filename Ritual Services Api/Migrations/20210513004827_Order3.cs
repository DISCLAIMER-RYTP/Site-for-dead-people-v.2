using Microsoft.EntityFrameworkCore.Migrations;

namespace Ritual_Services_Api.Migrations
{
    public partial class Order3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "FuneralOrders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateTable(
                name: "RequestOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Requests = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestOrders", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_FuneralOrders_RequestOrders_Id",
                table: "FuneralOrders",
                column: "Id",
                principalTable: "RequestOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FuneralOrders_RequestOrders_Id",
                table: "FuneralOrders");

            migrationBuilder.DropTable(
                name: "RequestOrders");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "FuneralOrders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");
        }
    }
}
