using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    public partial class sampledata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			var createViewSql = @"
				insert into bidder ( [TableNumber], [FullName], [Address], [City], [Province], [PostalCode], [HomePhone], [MobilePhone], [Email], [Deleted])
				values 
				('1','James Badder','101 1004 102','Edmonton','AB','T3J3J3','780-888-4444','780-444-5555','james@home.com',0),
				('1','Jill Badder','12010 101','Edmonton','AB','F4J4J4','780-110-4141','780-999-45445','Jill@home.com',0),
				('2','William Spratz','48 44545','Edmonton','AB','F3F3F3','780-778-8787','780-222-2323','William@home.com',0),
				('3','Wendy Parker','45 Striker ave','Leduc','AB','J0J1R2','780-333-4414','780-322-4455','Wendy@home.com',0),
				('3','Hillary Brent','82 Trent st','Calgary','AB','J3J6L3','780-444-7777','780-474-7474','Hillary@home.com',0),
				('4','Bruce Camper','101-1414 99 st','Edmonton','AB','B2B5D5','780-111-5555','780-665-7898','Bruce@home.com',0)

				insert into Donor ( [FullName], [ContactName], [Address], [PostalCode], [City], [Province], [HomePhone], [MobilePhone], [Email], [Deleted])
				values
				('Peter Tracer','Sally','1029 103 st','J3J3J3','Edmonton','AB','780-888-7777','780-555-4714','Peter@home.com',0),
				('Yvonne Wampleton','Andy','54-5452 414 ave','G2G1H1','Calgary','AB','780-444-4747','780-555-4714','Yvonne@home.com',0),
				('Greg Strapper','Vera','454 104th st','K3K3H3','Edmonton','AB','780-554-5656','780-555-4714','Gred@home.com',0),
				('Irene Blessed','Stephanie','99-3939 192 ave','N2N89Q','Lethbridge','AB','780-141-7874','780-555-4714','Irene@home.com',0),
				('Randy Grant','Fred','Willow Ave','G9G3J3','Fort McMurray','AB','780-444-4747','780-666-7777','Randy@home.com',0),
				('Georgia Lass','Hamilton','Robin st','N4N2N2','Edmonton','AB','780-444-4747','780-777-8585','Georgia@home.com',0)

				insert into Merchandise ( [ReceiptNumber], [ItemName], [LotId], [Description], [SpecialConditions], [CertificateInfo], [HasCertificate], [RetailValue], [ReserveValue], [SalePrice], [DonorId], [DateAdded], [Deleted])
				values
				('12202','Brick','122','One square brick','none','Certificate of Authenticity',1,100,50,75,1,'Oct 10 2023',0),
				('5525','Stick','122','Long Stick, good shape','has chew marks','Certificate of Authenticity',1,10000,9000,9000,2,'Oct 11 2023',0),
				('54487','Painting','144','Painting of old barn','in ornate frame','none',0,175,100,75,3,'Sep 1 2023',0),
				('33254','Wood Carving','25','Wood Carving of old man','none','Certificate of Authenticity',1,25,10,15,4,'Oct 11 2023',0),
				('77415','Gift Certificate','33','to Boston Pizza','Use before Dec 1','none',0,50,30,25,5,'Jun 17 2023',0),
				('55654','Bicycle','10','12 speed, banana seat','none','none',0,125,100,95,6,'Oct 1 2023',0)

				insert into payment ([BidderId], [PaymentDate], [PaymentMethodId])
				values (1,'oct 1 2023',1),
				 (2,'oct 10 2023',1),
				 (3,'Oct 2 2023',1),
				 (4,'Jun 22 2023',1),
				 (5,'sep 13 2023',1),
				 (6,'oct 11 2023',1)

				 insert into Purchase ( [BidderId], [MerchandiseId], [Price], [PurchaseDate], [Comment], [PaymentId])
				 values
				(1,1,50,'oct 1 2023','bought this',1),
				(2,2,150,'oct 2 2023','Gave as gift',2),
				(3,3,20,'sep 1 2023',null,3),
				(4,4,60,'oct 3 2023','Paid cash',4),
				(5,5,70,'oct 2 2023','Gave IOU',5),
				(6,6,80,'oct 11 2023','Will pick up tomorrow',6)

				";

			migrationBuilder.Sql(createViewSql);
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
