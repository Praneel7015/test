import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchCustomersPages } from '@/app/lib/data';
import { Suspense } from 'react';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';

export const metadata = { title: 'Customers' };

type CustomerSearch = { [key: string]: string | string[] | undefined };
export default async function Page({ searchParams }: { searchParams?: Promise<CustomerSearch>; }) {
	const resolved = (await searchParams) || {};
	const queryValue = resolved.query;
	const pageValue = resolved.page;
	const query = Array.isArray(queryValue) ? queryValue[0] : (queryValue || '');
	const currentPage = Number(Array.isArray(pageValue) ? pageValue[0] : pageValue) || 1;
	const totalPages = await fetchCustomersPages(query);
	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Search customers..." />
			</div>
					<Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}> 
						<CustomersTableServer query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}

async function CustomersTableServer({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	// Dynamically import the table which already expects formatted customers prop.
	// To keep parity with invoices table (which fetches inside component),
	// We'll fetch in a new server wrapper and pass formatted data down.
	const { fetchFilteredCustomers } = await import('@/app/lib/data');
	const data = await fetchFilteredCustomers(query, currentPage);
	return <CustomersTable customers={data as any} />;
}