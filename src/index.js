import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Filter,
  Sort,
  Reorder,
  Resize,
  Inject,
  Toolbar,
  Selection,
  Edit,
  ColumnMenu,
  Page,
  RowDD,
  ContextMenu
} from "@syncfusion/ej2-react-treegrid";
import { orderDetails } from "./data";
import { SampleBase } from "./sample-base";

export class Overview extends SampleBase {
  constructor() {
    super(...arguments);
    this.toolbarOptions = ["Search"];
    this.selectionsettings = { type: "Multiple" };
    this.editSettings = {
      allowAdding: true,
      allowDeleting: true,
      mode: "Batch",
    };

    this.contextMenuItems = [
      "AutoFit",
      "AutoFitAll",
      "SortAscending",
      "SortDescending",
      "Copy",
      "Edit",
      "Delete",
      "Save",
      "Cancel",
      "Paste",
      {text: 'Paste', target: '.e-content', id: 'paste', items: [{
          text: 'Above', id: 'abovepaste'
        }, {
          text: 'Below', id: 'belowpaste'
        }]}
    ];
  }

  contextMenuClick(args){
    const id = args.item.id;
    if(this.grid && id === 'abovepaste' || id === 'belowpaste'){
      this.performPaste(id === 'abovepaste' ? 'Above' : 'Below');
    }
  }

  performCut() {
    console.log(this.grid);
  }

  performPaste(position) {
    var _this = this.grid.clipboardModule;
    var grid = this.grid;
    this.grid.clipboardModule.activeElement = document.activeElement;
    this.grid.clipboardModule.clipBoardTextArea.value = "";
    this.grid.clipboardModule.clipBoardTextArea.focus();
    this.grid.getSelectedRows()[0].classList.add('e-batchrow');
    setTimeout(function () {
      const copyData = _this.copyContent.split("\t");
      const data = {};
      copyData.forEach((value, index) => {
        const col =  grid.grid.getColumnByIndex(index);
        if (col.visible) {
          data[col.field] = col.getParser() ? col.getParser()(value) : value
        }
      });
      grid.editModule.addRecord (data, _this.parent.selectedRowIndex, position)
    }, 10);
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <TreeGridComponent
            dataSource={orderDetails}
            editSettings={this.editSettings}
            selectionSettings={this.selectionsettings}
            toolbar={this.toolbarOptions}
            height="400"
            allowRowDragAndDrop={true}
            enableAdaptiveUI={true}
            allowReordering="true"
            allowResizing="true"
            allowFiltering="true"
            allowSorting="true"
            allowSearching="true"
            showColumnMenu={true}
            allowPaging={true}
            contextMenuItems={this.contextMenuItems}
            pageSettings={{ pageCount: 4, pageSizes: true }}
            filterSettings={{ type: "Menu", hierarchyMode: "Parent" }}
            created={this.paste}
            ref={g=> this.grid = g} contextMenuClick={this.contextMenuClick.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="OrderID"
                headerText="Order ID"
                width="200"
                textAlign="Right"
                showInColumnChooser={false}
              />
              <ColumnDirective
                field="CustomerName"
                headerText="Customer Name"
              />
              <ColumnDirective
                field="ShippedDate"
                headerText="Shipped Date"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="Freight"
                headerText="Freight"
                width="150"
                format="C2"
                textAlign="Right"
              />
              <ColumnDirective
                field="ShipName"
                headerText="Ship Name"
                visible={false}
                width="200"
              />
              <ColumnDirective
                field="ShipCountry"
                headerText="Ship Country"
                width="200"
              />
            </ColumnsDirective>
            <Inject
              services={[
                Filter,
                Sort,
                Reorder,
                Toolbar,
                Selection,
                Edit,
                Page,
                RowDD,
                ColumnMenu,
                ContextMenu,
                Resize
              ]}
            />
          </TreeGridComponent>
        </div>
      </div>
    );
  }
}

render(<Overview />, document.getElementById("sample"));
