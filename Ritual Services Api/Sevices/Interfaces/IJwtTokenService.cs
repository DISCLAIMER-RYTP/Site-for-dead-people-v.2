using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Sevices.Interfaces
{
    public interface IJwtTokenService
    {
        string CreateToken(User user);
    }
}
