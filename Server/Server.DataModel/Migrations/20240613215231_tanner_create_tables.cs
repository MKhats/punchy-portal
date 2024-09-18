using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
	/// <inheritdoc />
	public partial class tanner_create_tables : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Tables",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					TableNumber = table.Column<int>(type: "int", nullable: false),
					TableName = table.Column<string>(type: "nvarchar(125)", nullable: true),
					Capacity = table.Column<int>(type: "int", nullable: false),
					ServerName = table.Column<string>(type: "nvarchar(125)", nullable: true),
					AllowAlcohol = table.Column<bool>(type: "bit", nullable: false),
					IsDeleted = table.Column<bool>(type: "bit", nullable: false),
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Tables", x => x.Id);
				});
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "TableName",
				table: "Tables");

		}
	}
}