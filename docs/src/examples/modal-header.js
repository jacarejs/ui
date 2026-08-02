export const customTitle = `<Modal bind-open=\${open}>
  <ModalHeader>
    <Stack :gap=\${'xs'}>
      <strong>Workspace settings</strong>
      <span style="color:var(--j-muted);font-size:0.875rem">Billing and members</span>
    </Stack>
  </ModalHeader>
  <p>Choose how teammates join this workspace.</p>
  <ModalFooter>
    <Button on-press=\${() => open.set(false)}>Done</Button>
  </ModalFooter>
</Modal>`
