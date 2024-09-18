using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.DataModel
{
    public partial class PickListType
    {
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Description { get; set; }
        public int? ParentId { get; set; }
		public virtual PickListType Parent { get; set; }
		public bool IsActive { get; set; }
    }
}
