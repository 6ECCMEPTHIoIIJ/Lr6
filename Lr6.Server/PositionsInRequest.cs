using System;
using System.Collections.Generic;

namespace Lr6.Server;

public partial class PositionsInRequest
{
    public int Id { get; set; }

    public int? Count { get; set; }

    public int? RequestId { get; set; }

    public int? ProductId { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Request? Request { get; set; }
}
