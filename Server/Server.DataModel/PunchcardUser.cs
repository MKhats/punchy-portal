using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.DataModel
{
    public partial class PunchcardUser
    {
        public int Id { get; set; }
		/// <summary>
		/// Gets or sets the local database tenant identifier for the user in a multi-tenant environment.
		/// </summary>
		public int? TenantId { get; set; }
		public virtual Tenant Tenant { get; set; }

		/// <summary>
		/// Gets or sets the object identifier for the user in Azure Active Directory. In an OpenID Connect flow, this
		/// is mapped to the "sub" claim.
		/// </summary>
		public string AzureObjectId { get; set; }

		/// <summary>
		/// Gets or sets the username or display name of the last user to modify this record.
		/// </summary>
		public string LastModifiedBy { get; set; }

        public string RolesList { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }


    }
}
