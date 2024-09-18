using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class tanner_insert_data_to_tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
	            table:"Tables",
	            columns: new[] {"Id", "TableNumber", "TableName", "Capacity", "ServerName", "AllowAlcohol", "IsDeleted" },
	            values: new object[,]
                {
                    { 1,  1, "First Table", 25, "Server 1", true, false },
                    { 2,  1, "Testing", 25, "U just got served", true, false },
                    { 3,  2, "First Table in Group 2", 15, "Server 2", true, false },
                    { 4,  2, "Second Table in Group 2", 5, "SERRRRVE", false, false },
                    { 5,  3, "Table3", 2, "One Servey boii", true, false },
                    { 6,  3, "Table Here", 1, "Server 3", true, false },
                    { 7,  4, "Table in Group 4", 19, "Server 3", false, false },
                    { 8,  4, "Another Table in Group 4", 20, "Server 4", true, false },
                    { 9,  5, "No Bidders Assigned Here", 7, "Server 1", true, false },
                    { 10,  6, "No Bidders Here Also", 6, "TANNER", false, false },
                });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
