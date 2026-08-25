// Escapes user-supplied text before it's interpolated into email HTML, so a
// name like `<script>` or `"><img onerror=...>` can never inject markup.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
