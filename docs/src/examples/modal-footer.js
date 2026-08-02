export const inModal = `<Modal bind-open=\${open} :title=\${'Invite teammate'}>
  <p>They will receive an email with a one-time join link.</p>
  <ModalFooter>
    <Space>
      <Button :variant=\${'secondary'} on-press=\${() => open.set(false)}>Cancel</Button>
      <Button on-press=\${() => open.set(false)}>Send invite</Button>
    </Space>
  </ModalFooter>
</Modal>`

export const stackedActions = `<Modal bind-open=\${open} :title=\${'Delete project'}>
  <p>This permanently removes the project and its history.</p>
  <ModalFooter>
    <Space>
      <Button :variant=\${'ghost'} on-press=\${() => open.set(false)}>Keep</Button>
      <Button :variant=\${'danger'} on-press=\${() => open.set(false)}>Delete</Button>
    </Space>
  </ModalFooter>
</Modal>`
