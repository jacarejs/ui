export const propertyMapping = `import Table from '@jacare/ui/Table'
import TableColumn from '@jacare/ui/TableColumn'

export <view>
   <Table
    :columns=\${[{ prop: 'name', label: 'Name' }, { prop: 'status', label: 'Status' }]}
    :data=\${[{ name: 'API', status: 'Ready' }, { name: 'Docs', status: 'Draft' }]}
   >
    <TableColumn :prop=\${'name'} :label=\${'Name'} />
    <TableColumn :prop=\${'status'} :label=\${'Status'} />
   </Table>
</view>`

export const labels = `import Table from '@jacare/ui/Table'
import TableColumn from '@jacare/ui/TableColumn'

const columns = [
  { prop: 'package', label: 'Package' },
  { prop: 'version', label: 'Current version' },
]

export <view>
  <Table :columns=\${columns} :data=\${[{ package: '@jacare/ui', version: '0.1.3' }]}>
    <TableColumn :prop=\${'package'} :label=\${'Package'} />
    <TableColumn :prop=\${'version'} :label=\${'Current version'} />
  </Table>
</view>`

export const widths = `import Table from '@jacare/ui/Table'
import TableColumn from '@jacare/ui/TableColumn'

const columns = [
  { prop: 'name', label: 'Name', width: '60%' },
  { prop: 'status', label: 'Status', width: '160px' },
]

export <view>
  <Table :columns=\${columns} :data=\${[{ name: 'Documentation', status: 'Complete' }]} :border=\${true}>
    <TableColumn :prop=\${'name'} :label=\${'Name'} :width=\${'60%'} />
    <TableColumn :prop=\${'status'} :label=\${'Status'} :width=\${'160px'} />
  </Table>
</view>`
