using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nyhetssajt.Models
{
    public class Expressen
    {
        [Key]
        public int ID { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string ImageURL { get; set; }

        public string Text { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Date { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Category { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Link { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Source { get; set; }

    }
}

