using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.DataModel
{
    public partial class RoleXrefPermission
    {
        public int Id { get; set; }

        public int RoleId { get; set; }
		public virtual Role Role { get; set; }

		public int PermissionId { get; set; }
        public virtual Permission Permission { get; set; }
    }
}
