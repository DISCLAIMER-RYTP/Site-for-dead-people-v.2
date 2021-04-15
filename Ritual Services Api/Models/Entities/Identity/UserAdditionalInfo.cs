using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Entities.Identity
{
    public class UserAdditionalInfo
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Image { get; set; }
        public int Age { get; set; }

        /*Navigation Property*/

        public virtual User User { get; set; }
    }
}
