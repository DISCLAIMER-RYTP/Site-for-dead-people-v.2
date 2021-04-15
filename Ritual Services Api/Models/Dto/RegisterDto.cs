﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Dto
{
    public class RegisterDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public int Age { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
    }
}
