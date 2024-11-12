using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GitorialAPI.Data.Entities
{
    public class User : IdentityUser
    {
        [Required]
        [PersonalData]
        [Column(TypeName = "nvarchar(150)")]
        public string Firstname { get; set; }
        [Required]
        [PersonalData]
        [Column(TypeName = "nvarchar(150)")]
        public string Lastname { get; set; }
        [Required]
        public bool IsActive { get; set; }
        public DateTimeOffset TimeCreated { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset TimeUpdated { get; set; } = DateTimeOffset.UtcNow;
    }
}
