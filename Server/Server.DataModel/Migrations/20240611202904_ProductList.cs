using System.Data.Common;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class ProductList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductList",
                columns: table => new
                {
                    tannerId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductList", x => x.Id);
                });
            migrationBuilder.InsertData(
	            table:"ProductList",
	            columns: new[] {"Id", "tannerId", "productName", "productType" },
	            values: new object[,]
                {
                    { 1,  1, "Long Sleeve T-Shirt", "T-Shirts" },
                    { 2, 2, "Sweater", "Sweaters/Crewnecks" },
                    { 3, 3, "Jeans", "Denim" },
                    { 4, 4, "Leather Boots", "Footwear" },
                    { 5, 5, "Necklace", "Accessories" },
                    { 6, 6, "Gloves", "Accessories" },
                    { 7, 7, "Leather Jacket", "Leather Goods" },
                    { 8, 8, "Wool Coat", "Outerwear" },
                    { 9, 199, "Swim Shorts", "Shorts" }
                });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductList");
        }
    }
}
