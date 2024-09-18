﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Punchcard.Core.Server.DataModel;

#nullable disable

namespace Punchcard.Core.Server.DataModel.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20231005164511_views")]
    partial class views
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Bidder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HomePhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobilePhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Province")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TableNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Bidder");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Document", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("DocumentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParentId")
                        .HasColumnType("int");

                    b.Property<int>("ParentType")
                        .HasColumnType("int");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("UploadUserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Document");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Donor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HomePhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobilePhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Province")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Donor");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Feedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AppPermissions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AppVersion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("BatteryPercentage")
                        .HasColumnType("real");

                    b.Property<string>("Browser")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BrowserVersion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BuildId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset?>("CompletedDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("ComputerOs")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComputerOsVersion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DeviceLanguage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DeviceOs")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DeviceVersion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Dismissed")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("ElevatedDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("FeedbackType")
                        .HasColumnType("int");

                    b.Property<bool>("IsLowPowerMode")
                        .HasColumnType("bit");

                    b.Property<string>("Language")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PagesVisited")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("Severity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("SubmittedDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Merchandise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CertificateInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DonorId")
                        .HasColumnType("int");

                    b.Property<bool>("HasCertificate")
                        .HasColumnType("bit");

                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LotId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiptNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("ReserveValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("RetailValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("SalePrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("SpecialConditions")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Merchandise");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("BidderId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PaymentMethodId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Permission");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Code = "ReadTenant",
                            Description = "Permission to read tenant information",
                            Name = "Read tenant"
                        },
                        new
                        {
                            Id = 2,
                            Code = "WriteTenant",
                            Description = "Permission to write tenant information",
                            Name = "Write tenant"
                        },
                        new
                        {
                            Id = 3,
                            Code = "ReadRole",
                            Description = "Permission to read role information",
                            Name = "Read role"
                        },
                        new
                        {
                            Id = 4,
                            Code = "WriteRole",
                            Description = "Permission to write role information",
                            Name = "Write role"
                        },
                        new
                        {
                            Id = 5,
                            Code = "ReadPickList",
                            Description = "Permission to read picklist information",
                            Name = "Read picklist"
                        },
                        new
                        {
                            Id = 6,
                            Code = "WritePickList",
                            Description = "Permission to write picklist information",
                            Name = "Write picklist"
                        },
                        new
                        {
                            Id = 7,
                            Code = "ReadUser",
                            Description = "Permission to read user information",
                            Name = "Read user"
                        },
                        new
                        {
                            Id = 8,
                            Code = "WriteUser",
                            Description = "Permission to read and write user information",
                            Name = "Write user"
                        },
                        new
                        {
                            Id = 9,
                            Code = "GlobalAdmin",
                            Description = "Must have global admin permission to modify or add people to the global admin role",
                            Name = "Global Admin"
                        });
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PickListItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("bit");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int");

                    b.Property<int>("PickListTypeId")
                        .HasColumnType("int");

                    b.Property<int?>("Sort")
                        .HasColumnType("int");

                    b.Property<string>("Value1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Value2")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("PickListTypeId");

                    b.ToTable("PickListItem");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PickListType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("PickListType");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PunchcardUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AzureObjectId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RolesList")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TenantId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TenantId");

                    b.ToTable("PunchcardUser");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PunchcardUserXrefRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("PunchcardUserXrefRole");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Purchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("BidderId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MerchandiseId")
                        .HasColumnType("int");

                    b.Property<int>("PaymentId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("PurchaseDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Purchase");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Role should have access to everything",
                            IsDefault = false,
                            Name = "Global Admin"
                        });
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.RoleXrefPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("PermissionId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PermissionId");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleXrefPermission");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            PermissionId = 1,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 2,
                            PermissionId = 2,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 3,
                            PermissionId = 3,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 4,
                            PermissionId = 4,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 5,
                            PermissionId = 5,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 6,
                            PermissionId = 6,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 7,
                            PermissionId = 7,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 8,
                            PermissionId = 8,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 9,
                            PermissionId = 9,
                            RoleId = 1
                        });
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Tenant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tenant");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsActive = true,
                            LastModifiedBy = "System",
                            Name = "Default Tenant"
                        });
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PickListItem", b =>
                {
                    b.HasOne("Punchcard.Core.Server.DataModel.PickListItem", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.HasOne("Punchcard.Core.Server.DataModel.PickListType", "PickListType")
                        .WithMany()
                        .HasForeignKey("PickListTypeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Parent");

                    b.Navigation("PickListType");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PickListType", b =>
                {
                    b.HasOne("Punchcard.Core.Server.DataModel.PickListType", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PunchcardUser", b =>
                {
                    b.HasOne("Punchcard.Core.Server.DataModel.Tenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId");

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.PunchcardUserXrefRole", b =>
                {
                    b.HasOne("Punchcard.Core.Server.DataModel.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Punchcard.Core.Server.DataModel.PunchcardUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.RoleXrefPermission", b =>
                {
                    b.HasOne("Punchcard.Core.Server.DataModel.Permission", "Permission")
                        .WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Punchcard.Core.Server.DataModel.Role", "Role")
                        .WithMany("RoleXrefPermissions")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Permission");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Punchcard.Core.Server.DataModel.Role", b =>
                {
                    b.Navigation("RoleXrefPermissions");
                });
#pragma warning restore 612, 618
        }
    }
}
