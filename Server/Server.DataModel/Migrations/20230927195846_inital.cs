using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    public partial class inital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeedbackType = table.Column<int>(type: "int", nullable: false),
                    SubmittedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CompletedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ElevatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    Dismissed = table.Column<bool>(type: "bit", nullable: false),
                    Browser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrowserVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ComputerOs = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ComputerOsVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceOs = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceLanguage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BuildId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BatteryPercentage = table.Column<float>(type: "real", nullable: false),
                    IsLowPowerMode = table.Column<bool>(type: "bit", nullable: false),
                    PagesVisited = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppPermissions = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PickListType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickListType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PickListType_PickListType_ParentId",
                        column: x => x.ParentId,
                        principalTable: "PickListType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tenant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenant", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PickListItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PickListTypeId = table.Column<int>(type: "int", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Value1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sort = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickListItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PickListItem_PickListItem_ParentId",
                        column: x => x.ParentId,
                        principalTable: "PickListItem",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PickListItem_PickListType_PickListTypeId",
                        column: x => x.PickListTypeId,
                        principalTable: "PickListType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RoleXrefPermission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleXrefPermission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleXrefPermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permission",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RoleXrefPermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PunchcardUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    AzureObjectId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RolesList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PunchcardUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PunchcardUser_Tenant_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenant",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PunchcardUserXrefRole",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PunchcardUserXrefRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PunchcardUserXrefRole_PunchcardUser_UserId",
                        column: x => x.UserId,
                        principalTable: "PunchcardUser",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PunchcardUserXrefRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Permission",
                columns: new[] { "Id", "Code", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "ReadTenant", "Permission to read tenant information", "Read tenant" },
                    { 2, "WriteTenant", "Permission to write tenant information", "Write tenant" },
                    { 3, "ReadRole", "Permission to read role information", "Read role" },
                    { 4, "WriteRole", "Permission to write role information", "Write role" },
                    { 5, "ReadPickList", "Permission to read picklist information", "Read picklist" },
                    { 6, "WritePickList", "Permission to write picklist information", "Write picklist" },
                    { 7, "ReadUser", "Permission to read user information", "Read user" },
                    { 8, "WriteUser", "Permission to read and write user information", "Write user" },
                    { 9, "GlobalAdmin", "Must have global admin permission to modify or add people to the global admin role", "Global Admin" }
                });

            migrationBuilder.InsertData(
                table: "PickListType",
                columns: new[] { "Id", "Code", "Description", "IsActive", "ParentId" },
                values: new object[] { 1, "Province", "Province", true, null });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Description", "IsDefault", "Name" },
                values: new object[] { 1, "Role should have access to everything", false, "Global Admin" });

            migrationBuilder.InsertData(
                table: "Tenant",
                columns: new[] { "Id", "IsActive", "LastModifiedBy", "Name" },
                values: new object[] { 1, true, "System", "Default Tenant" });

            migrationBuilder.InsertData(
                table: "PickListItem",
                columns: new[] { "Id", "Code", "Description", "IsActive", "IsDefault", "LastModifiedBy", "ParentId", "PickListTypeId", "Sort", "Value1", "Value2" },
                values: new object[,]
                {
                    { 1, "AB", "Alberta", true, false, null, null, 1, 0, null, null },
                    { 2, "BC", "British Columbia", true, false, null, null, 1, 1, null, null },
                    { 3, "MB", "Manitoba", true, false, null, null, 1, 2, null, null },
                    { 4, "NB", "New Brunswick", true, false, null, null, 1, 3, null, null },
                    { 5, "NL", "Newfoundland and Labrador", true, false, null, null, 1, 4, null, null },
                    { 6, "NS", "Nova Scotia", true, false, null, null, 1, 5, null, null },
                    { 7, "ON", "Ontario", true, false, null, null, 1, 6, null, null },
                    { 8, "PE", "Prince Edward Island", true, false, null, null, 1, 7, null, null },
                    { 9, "QC", "Quebec", true, false, null, null, 1, 8, null, null },
                    { 10, "SK", "Saskatchewan", true, false, null, null, 1, 9, null, null },
                    { 11, "NT", "Northwest Territories", true, false, null, null, 1, 10, null, null },
                    { 12, "YT", "Yukon", true, false, null, null, 1, 11, null, null },
                    { 13, "NU", "Nunavut", true, false, null, null, 1, 12, null, null }
                });

            migrationBuilder.InsertData(
                table: "RoleXrefPermission",
                columns: new[] { "Id", "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 1 },
                    { 3, 3, 1 },
                    { 4, 4, 1 },
                    { 5, 5, 1 },
                    { 6, 6, 1 },
                    { 7, 7, 1 },
                    { 8, 8, 1 },
                    { 9, 9, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PickListItem_ParentId",
                table: "PickListItem",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_PickListItem_PickListTypeId",
                table: "PickListItem",
                column: "PickListTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PickListType_ParentId",
                table: "PickListType",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_PunchcardUser_TenantId",
                table: "PunchcardUser",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_PunchcardUserXrefRole_RoleId",
                table: "PunchcardUserXrefRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_PunchcardUserXrefRole_UserId",
                table: "PunchcardUserXrefRole",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleXrefPermission_PermissionId",
                table: "RoleXrefPermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleXrefPermission_RoleId",
                table: "RoleXrefPermission",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "PickListItem");

            migrationBuilder.DropTable(
                name: "PunchcardUserXrefRole");

            migrationBuilder.DropTable(
                name: "RoleXrefPermission");

            migrationBuilder.DropTable(
                name: "PickListType");

            migrationBuilder.DropTable(
                name: "PunchcardUser");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Tenant");
        }
    }
}
