import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface GridRowData {
  id: string;
  value: string;
  description: string;
  moreInfo: string;
}

// Sample data with various description lengths
const sampleData: GridRowData[] = [
  {
    id: '1',
    value: 'Product A',
    description: 'A revolutionary product that transforms the way users interact with technology through innovative design and seamless functionality.',
    moreInfo: 'This product features advanced AI capabilities, real-time analytics, and enterprise-grade security. It integrates with over 50 third-party services and supports multiple deployment options including cloud, on-premise, and hybrid environments.',
  },
  {
    id: '2',
    value: 'Service B',
    description: 'Premium consulting service.',
    moreInfo: 'Our consulting service includes strategic planning, technical implementation, and ongoing support. We have a team of certified experts with over 10 years of experience in the industry.',
  },
  {
    id: '3',
    value: 'Platform C',
    description: 'Comprehensive platform designed for modern businesses that need scalable solutions to manage their operations, streamline workflows, and enhance productivity across multiple departments and teams.',
    moreInfo: 'The platform includes modules for project management, customer relationship management, financial tracking, and reporting. It supports API integrations, custom workflows, and advanced automation features.',
  },
  {
    id: '4',
    value: 'Tool D',
    description: 'Simple yet powerful automation tool that helps teams save time and reduce manual work through intelligent process automation and smart scheduling capabilities.',
    moreInfo: 'Features include drag-and-drop workflow builder, scheduled tasks, email notifications, and integration with popular productivity tools like Slack, Microsoft Teams, and Google Workspace.',
  },
  {
    id: '5',
    value: 'Solution E',
    description: 'End-to-end solution.',
    moreInfo: 'Complete solution covering everything from initial setup to ongoing maintenance and support.',
  },
];

// Custom cell renderer for the description column
const DescriptionCellRenderer = ({ value }: { value: string }) => {
  return (
    <div className="description-cell py-2">
      {value}
    </div>
  );
};

// Custom cell renderer for the more info column
const MoreInfoCellRenderer = ({ data }: { data: GridRowData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="more-info-cell py-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="more-info-button">
            <Info className="h-4 w-4" />
            More Info
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end" side="left">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Additional Details</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.moreInfo}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const DataGrid: React.FC = () => {
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: 'Value',
        field: 'value',
        width: 150,
        cellClass: 'font-medium',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Description',
        field: 'description',
        flex: 1,
        cellRenderer: DescriptionCellRenderer,
        autoHeight: true,
        wrapText: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Details',
        field: 'moreInfo',
        width: 140,
        cellRenderer: MoreInfoCellRenderer,
        sortable: false,
        filter: false,
        cellStyle: { textAlign: 'center' },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      cellClass: 'flex items-start',
    }),
    []
  );

  const gridOptions: GridOptions = {
    animateRows: true,
    enableCellTextSelection: true,
    ensureDomOrder: true,
    suppressRowClickSelection: true,
    domLayout: 'autoHeight' as const,
  };

  return (
    <div className="w-full h-[600px] p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Data Grid</h1>
        <p className="text-muted-foreground">
          Clean, scalable grid with multi-line descriptions and expandable details.
        </p>
      </div>
      
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          rowData={sampleData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          suppressHorizontalScroll={false}
          getRowId={(params) => params.data.id}
        />
      </div>
    </div>
  );
};

export default DataGrid;