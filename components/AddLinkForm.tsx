import { useRef } from 'react';

type Link = {
  link: string;
  customName: string;
};

interface LinkTypes {
  setLinkId: (linkId: string) => void;
  setCustomLink: (customLink: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const AddLinkForm: React.FC<LinkTypes> = ({
  setLinkId,
  setCustomLink,
  setLoading,
  setError,
}) => {
  const input = useRef<HTMLInputElement>(null);
  const customName = useRef<HTMLInputElement>(null);
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError('');
    setLinkId('');
    setCustomLink('');
    setLoading(true);
    let url = input.current!.value;

    if (!urlPattern.test(url)) {
      setError('Please enter a valid URL');
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const data = await (
      await fetch('/api/addlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: url,
          customName: customName.current!.value,
        }),
      })
    ).json();
    setLoading(false);
    setLinkId(data.link);
    setCustomLink(data.customName);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='grid gap-2 w-full max-w-xs'>
        <input
          type='text'
          placeholder='Enter your URL'
          ref={input}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
        />
        <input
          type='text'
          placeholder='Enter custom name'
          ref={customName}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
        />
        <button
          type='submit'
          className='bg-white text-black p-2 rounded hover:bg-black hover:text-white border-white border-2 transition duration-300 ease-in-out'
        >
          Shorten
        </button>
      </form>
    </>
  );
};

export default AddLinkForm;
