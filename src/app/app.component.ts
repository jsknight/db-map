import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2,
} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "db-map";
  tables = [
    {
      domId: "users",
      name: "Users",
      color: "#F66D9B",
      lines: [],
      rows: [
        {
          name: "id",
          type: "",
          connections: [],
        },
        { name: "name", type: "", connections: [] },
        { name: "email", type: "", connections: [] },
        { name: "password", type: "", connections: [] },
        { name: "remember_token", type: "", connections: [] },
        { name: "created_at", type: "", connections: [] },
        { name: "updated_at", type: "", connections: [] },
      ],
    },
    {
      domId: "reservations",
      name: "Reservations",
      color: "#6574CD",
      lines: [],
      rows: [
        {
          name: "id",
          type: "",
          connections: [{ start: "reservationsid", stop: "reviewsid" }],
        },
        {
          name: "user_id",
          type: "",
          connections: [{ start: "reservationsuser_id", stop: "usersid" }],
        },
        {
          name: "room_id",
          type: "",
          connections: [{ start: "reservationsroom_id", stop: "roomsid" }],
        },
        { name: "start_date", type: "", connections: [] },
        { name: "end_date", type: "", connections: [] },
        { name: "price", type: "", connections: [] },
        { name: "created_at", type: "", connections: [] },
        { name: "updated_at", type: "", connections: [] },
      ],
    },
    {
      domId: "rooms",
      name: "Rooms",
      color: "#9561E2",
      lines: [],
      rows: [
        {
          name: "id",
          type: "",
          connections: [{ start: "roomsid", stop: "mediaid" }],
        },
        { name: "home_type", type: "", connections: [] },
        { name: "room_type", type: "", connections: [] },
        { name: "total_occupancy", type: "", connections: [] },
        { name: "total_bedrooms", type: "", connections: [] },
        { name: "total_bathrooms", type: "", connections: [] },
        { name: "summary", type: "", connections: [] },
        { name: "address", type: "", connections: [] },
        { name: "has_tv", type: "", connections: [] },
        { name: "has_kitchen", type: "", connections: [] },
        { name: "has_internet", type: "", connections: [] },
        { name: "price", type: "", connections: [] },
        { name: "published_at", type: "", connections: [] },
        {
          name: "owner_id",
          type: "",
          connections: [{ start: "roomsowner_id", stop: "usersid" }],
        },
        { name: "created_at", type: "", connections: [] },
        { name: "updated_at", type: "", connections: [] },
        { name: "latitude", type: "", connections: [] },
        { name: "longitude", type: "", connections: [] },
      ],
    },
    {
      domId: "reviews",
      name: "Reviews",
      color: "#4DC0B5",
      lines: [],
      rows: [
        {
          name: "id",
          type: "",
          connections: [{ start: "reviewsid", stop: "mediaid" }],
        },
        { name: "rating", type: "", connections: [] },
        { name: "comment", type: "", connections: [] },
      ],
    },
    {
      domId: "media",
      name: "Media",
      color: "#3490DC",
      lines: [],
      rows: [
        { name: "id", type: "", connections: [] },
        { name: "model_id", type: "", connections: [] },
        { name: "model_type", type: "", connections: [] },
        { name: "file_name", type: "", connections: [] },
        { name: "mime_type", type: "", connections: [] },
      ],
    },
  ];
  line = {};

  constructor(private rd: Renderer2) {}

  loadLine(tableObject, row) {
    if (row.connections.length) {
      row.connections.forEach((connection) => {
        console.log(
          "row.name",
          row.name,
          connection,
          document.getElementById(connection.start),
          document.getElementById(connection.stop)
        );
        tableObject.lines.push(
          new LeaderLine(
            document.getElementById(connection.start),
            document.getElementById(connection.stop),
            {
              path: "fluid",
              size: 2,
              startPlugSize: 2,
              endPlugSize: 2,
              startPlug: "behind",
              startSocket: "auto",
              endSocket: "auto",
              endPlug: "square",
              color: "rgba(200, 200, 200, 1)",
              endPlugColor: "rgba(200, 200, 200, 1)",
            }
          )
        );
      });
    } else {
      console.log("no connections for ", row.name);
    }
  }

  loadTableObject(tableObject) {
    let myThis = this;
    tableObject.draggable = new PlainDraggable(
      document.getElementById(tableObject.domId),
      {
        onMove: function () {
          if (!myThis.tables.length) return;
          myThis.tables.forEach((table) => {
            table.lines.forEach((line) => {
              line.position();
            });
          });
        },
        onMoveStart: function () {
          if (!myThis.tables.length) return;
          myThis.tables.forEach((table) => {
            table.lines.forEach((line) => {
              line.dash = { animation: true };
            });
          });
        },
        onDragEnd: function () {
          if (!myThis.tables.length) return;
          myThis.tables.forEach((table) => {
            table.lines.forEach((line) => {
              line.dash = false;
            });
          });
        },
      }
    );
    if (tableObject.rows.length) {
      tableObject.rows.forEach((row) => {
        this.loadLine(tableObject, row);
      });
    }
  }

  ngAfterViewInit() {
    // this.draggable.two["autoScroll"] = true;
    this.tables.forEach((item) => {
      console.log("Table:", item);
      this.loadTableObject(item);
    });
  }

  ngAfterViewChecked() {}
}
