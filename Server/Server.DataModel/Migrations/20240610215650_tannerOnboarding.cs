using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class tannerOnboarding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TannerOnboarding",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumericCol = table.Column<int>(type: "int", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RestrictedCharInput = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnRestrictedCharInput = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TannerOnboarding", x => x.Id);
                });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TannerOnboarding");

        }
    }
}
