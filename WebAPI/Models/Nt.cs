using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nyhetssajt.Models
{
    public class Nt
    {
        [Key]
        public int id { get; set; }

        public string title { get; set; }

        public string ImageURL { get; set; }

        public string description { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string pubDate { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string category { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string link { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string source { get; set; }
    }
}
