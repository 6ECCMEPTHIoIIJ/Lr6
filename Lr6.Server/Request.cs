using System;
using System.Collections.Generic;

namespace Lr6.Server;

public partial class Request
{
    public int Id { get; set; }

    public int? StorageId { get; set; }

    public DateOnly RequestDate { get; set; }

    public DateOnly? CompletionDate { get; set; }

    public virtual ICollection<PositionsInRequest> PositionsInRequests { get; set; } = new List<PositionsInRequest>();

    public virtual Storage? Storage { get; set; }
}
