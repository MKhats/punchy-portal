using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    public partial class views : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			var createViewSql = @"
				CREATE OR ALTER VIEW [dbo].[vCumulativePurchases]
				AS
				SELECT ID, 0 as BidderId,0 as MerchandiseId,getdate() as PurchaseDate,'' as Comment,0 as PaymentId,
				SUM([price]) OVER (ORDER BY ID) AS [price]
				FROM purchase
				";

			migrationBuilder.Sql(createViewSql);
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
