export const mainframeActionClass =
  'inline-block w-fit bg-black px-1 uppercase text-[#37ff73] transition-colors hover:!bg-[#37ff73] hover:!text-black focus-visible:!bg-[#37ff73] focus-visible:!text-black focus-visible:outline-none';

export function mainframeAction(extraClass = '') {
  return `${mainframeActionClass} ${extraClass}`.trim();
}
