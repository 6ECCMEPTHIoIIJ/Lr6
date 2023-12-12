using System;
using System.Collections.Generic;

namespace Lr6.Server;

public partial class Storage
{
    public int Id { get; set; }

    public string Address { get; set; } = null!;

    public virtual ICollection<ProductStock> ProductStocks { get; set; } = new List<ProductStock>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

    public virtual ICollection<Supply> Supplies { get; set; } = new List<Supply>();
}
