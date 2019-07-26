using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ReactSampleProj.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<ToDoList> Gettodolist()
        {
            return Enumerable.Range(1, 5).Select(index => new ToDoList
            {
                ID = index,
                ItemName = string.Format("{0}{1}", "item", index.ToString()),
                IsCompleted = false
            }
        );
      }

        public class ToDoList
        {
            public int ID { get; set; }

            public string ItemName { get; set; }

            public bool IsCompleted { get; set; }
        }
    }
}
