using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.DataModel
{
    public partial class PickListItem
    {
        public int Id { get; set; }
        public int PickListTypeId { get; set; }
		public virtual PickListType PickListType { get; set; }
		public int? ParentId { get; set; }
		public virtual PickListItem Parent { get; set; }
		public bool IsDefault { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string Value1 { get; set; }
        public string Value2 { get; set; }
        public string LastModifiedBy { get; set; }
        public int? Sort { get; set; }
    }
}
