import React from 'react'
import { Anchor } from 'antd';

const { Link } = Anchor;

const AnchorCpn: React.SFC = () => {
  return (
    <Anchor>
      <Link href="#antd-anchor-todo" title="Todo" />
    </Anchor>
  )
}

export default React.memo(AnchorCpn)
