import React from 'react';
export default function Link({href,children,...props}){return <a href={href==='/setup'?'#settings':href} {...props}>{children}</a>}
