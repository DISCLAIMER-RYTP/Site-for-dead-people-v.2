using Microsoft.EntityFrameworkCore.Migrations;

namespace Ritual_Services_Api.Migrations
{
    public partial class addOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "FuneralOrders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "FuneralOrders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CategoryOrder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryOrder", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FuneralOrders_CategoryId",
                table: "FuneralOrders",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_FuneralOrders_UserId",
                table: "FuneralOrders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FuneralOrders_AspNetUsers_UserId",
                table: "FuneralOrders",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FuneralOrders_CategoryOrder_CategoryId",
                table: "FuneralOrders",
                column: "CategoryId",
                principalTable: "CategoryOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FuneralOrders_AspNetUsers_UserId",
                table: "FuneralOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_FuneralOrders_CategoryOrder_CategoryId",
                table: "FuneralOrders");

            migrationBuilder.DropTable(
                name: "CategoryOrder");

            migrationBuilder.DropIndex(
                name: "IX_FuneralOrders_CategoryId",
                table: "FuneralOrders");

            migrationBuilder.DropIndex(
                name: "IX_FuneralOrders_UserId",
                table: "FuneralOrders");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "FuneralOrders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FuneralOrders");
        }
    }
}
