using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.DataModel
{
    public partial class PunchcardUserXrefRole
    {
        public int Id { get; set; }

        public int UserId { get; set; }
		public virtual PunchcardUser User { get; set; }

		public int RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
