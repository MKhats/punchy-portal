using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Punchcard.Core.Server.DataModel
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

		public virtual DbSet<Permission> Permissions { get; set; }
		public virtual DbSet<PickListItem> PickListItems { get; set; }
		public virtual DbSet<PickListType> PickListTypes { get; set; }
		public virtual DbSet<PunchcardUser> PunchcardUsers { get; set; }
		public virtual DbSet<PunchcardUserXrefRole> PunchcardUserXrefRoles { get; set; }
		public virtual DbSet<Role> Roles { get; set; }
		public virtual DbSet<RoleXrefPermission> RoleXrefPermissions { get; set; }
		public virtual DbSet<Tenant> Tenants { get; set; }
		public virtual DbSet<Bidder> Bidders { get; set; }
		public virtual DbSet<Donor> Donors { get; set; }
		public virtual DbSet<Merchandise> Merchandises { get; set; }
		public virtual DbSet<Document> Documents { get; set; }
		public virtual DbSet<Payment> Payments { get; set; }
		public virtual DbSet<Purchase> Purchases { get; set; }
		public virtual DbSet<Feedback> Feedbacks { get; set; }
		
		public virtual DbSet<TannerOnboarding> TannerOnboarding { get; set; }
		
		public virtual DbSet<ProductList> ProductList { get; set; }
		
		public virtual DbSet<Tables> Tables { get; set; }
		

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer();
			//optionsBuilder.UseSqlServer("Data Source=DESKTOP-9EDJ1M8;Initial Catalog=CoreOnboarding;Integrated Security=True");
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.RemoveOneToManyCascade();
			modelBuilder.RemovePluralizeBehavior();

			// ********************* IMPORTANT *********************
			// do not add further data seeding here!  This is for the initial data only.
			// instead add your new data requiresments in a migration.  Don't forget to remove your data on the Down migration
			// EG:
			// migrationBuilder.Sql("Insert Into PickListType (Code, Description, IsActive) Values ('HourTypes', 'Hour Types', 1)");
			// migrationBuilder.Sql(@"
			//    DECLARE @hoursTypeId as int;
			//    SET @hoursTypeId = (SELECT Id FROM PickListType WHERE Code = 'HourTypes');
			//    Insert Into PickListItem (PickListTypeId, Code, Description, IsDefault, IsActive, LastModifiedBy, Sort)
			//    Values
			//        (@hoursTypeId, 'SEDDual', 'Single Engine Day Dual', 0, 1, 'System', 1),
			//        (@hoursTypeId, 'SEDPIC', 'Single Engine Day PIC', 1, 1, 'System', 2),
			//    ");
			// See link for documentation https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/operations#using-migrationbuildersql

			modelBuilder.Entity<Tenant>().HasData(new Tenant { Id = 1, IsActive = true, LastModifiedBy = "System", Name = "Default Tenant" });
			modelBuilder.Entity<Role>().HasData(new Role { Id = 1, Name = "Global Admin", Description = "Role should have access to everything" });
			
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=1, Code="ReadTenant", Name="Read tenant", Description="Permission to read tenant information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=2, Code="WriteTenant", Name="Write tenant", Description="Permission to write tenant information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=3, Code="ReadRole", Name="Read role", Description="Permission to read role information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=4, Code="WriteRole", Name="Write role", Description="Permission to write role information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=5, Code="ReadPickList", Name="Read picklist", Description="Permission to read picklist information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=6, Code="WritePickList", Name="Write picklist", Description="Permission to write picklist information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=7, Code="ReadUser", Name="Read user", Description="Permission to read user information"});
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=8, Code="WriteUser", Name="Write user", Description="Permission to read and write user information" });
			modelBuilder.Entity<Permission>().HasData(new Permission { Id=9, Code="GlobalAdmin", Name="Global Admin", Description="Must have global admin permission to modify or add people to the global admin role" });

			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 1, PermissionId = 1, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 2, PermissionId = 2, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 3, PermissionId = 3, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 4, PermissionId = 4, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 5, PermissionId = 5, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 6, PermissionId = 6, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 7, PermissionId = 7, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 8, PermissionId = 8, RoleId = 1 });
			modelBuilder.Entity<RoleXrefPermission>().HasData(new RoleXrefPermission { Id = 9, PermissionId = 9, RoleId = 1 });


			modelBuilder.Entity<PickListType>().HasData(new PickListType{Id = 1,Code = "Province",Description = "Province",IsActive=true});

			modelBuilder.Entity<PickListItem>().HasData(new PickListItem{ Id=1, PickListTypeId = 1,Code = "AB",Description = "Alberta", IsActive = true, Sort = 0});
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 2, PickListTypeId = 1, Code = "BC", Description = "British Columbia", IsActive = true, Sort = 1 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 3, PickListTypeId = 1, Code = "MB", Description = "Manitoba", IsActive = true, Sort = 2 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 4, PickListTypeId = 1, Code = "NB", Description = "New Brunswick", IsActive = true, Sort = 3 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 5, PickListTypeId = 1, Code = "NL", Description = "Newfoundland and Labrador", IsActive = true, Sort = 4 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 6, PickListTypeId = 1, Code = "NS", Description = "Nova Scotia", IsActive = true, Sort = 5 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 7, PickListTypeId = 1, Code = "ON", Description = "Ontario", IsActive = true, Sort = 6 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 8, PickListTypeId = 1, Code = "PE", Description = "Prince Edward Island", IsActive = true, Sort = 7 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 9, PickListTypeId = 1, Code = "QC", Description = "Quebec", IsActive = true, Sort = 8 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 10, PickListTypeId = 1, Code = "SK", Description = "Saskatchewan", IsActive = true, Sort = 9 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 11, PickListTypeId = 1, Code = "NT", Description = "Northwest Territories", IsActive = true, Sort = 10 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 12, PickListTypeId = 1, Code = "YT", Description = "Yukon", IsActive = true, Sort = 11 });
			modelBuilder.Entity<PickListItem>().HasData(new PickListItem { Id = 13, PickListTypeId = 1, Code = "NU", Description = "Nunavut", IsActive = true, Sort = 12 });


			OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }

	public static class ContextExtensions
	{
		public static void RemovePluralizeBehavior(this ModelBuilder builder)
		{
			builder.EntityLoop(et => et.SetTableName(et.DisplayName()));
		}

		/// <summary>
		/// Removes Cascade De
		/// </summary>
		/// <param name="builder"></param>
		public static void RemoveOneToManyCascade(this ModelBuilder builder)
		{
			builder.EntityLoop(et => et.GetForeignKeys()
				.Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade)
				.ToList()
				.ForEach(fk => fk.DeleteBehavior = DeleteBehavior.NoAction));
		}


		private static void EntityLoop(this ModelBuilder builder, Action<IMutableEntityType> action)
		{
			foreach (var entityType in builder.Model.GetEntityTypes())
			{
				action(entityType);
			}
		}
	}
}
