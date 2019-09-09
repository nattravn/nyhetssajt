using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nyhetssajt.Models
{
    public class Source
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public string rss { get; set; }

        public string info { get; set; }

        public string title { get; set; }
    }
}
