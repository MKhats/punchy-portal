using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class tannerUpdateMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
	        migrationBuilder.AddColumn<string>(name: "migratedColumn", table: "TannerOnboarding", nullable: true, type: "nvarchar");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
	        migrationBuilder.DropColumn(name: "migratedColumn", table: "TannerOnboarding");

        }
    }
}
