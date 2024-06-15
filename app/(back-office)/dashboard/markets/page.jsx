import React from "react";
import PageHeader from "@/components/backoffice/PageHeader/";
import TableAction from '@/components/backoffice/TableAction';


export default function () {
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Markets"
        href="/dashboard/markets/new"
        linkTitle="Add Market"
      />
      {/* Table Actions*/}
      {/* Export || Search || Bulk Delete */}
      <TableAction/>
      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
}
