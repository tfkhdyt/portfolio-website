import Title from '../Title';

import WorkExperienceListItem from './WorkExperienceListItem';

const contents = [
	{
		company: 'Netovas Eterna Teknologi',
		period: 'Dec 2022 – Present',
		role: 'Full Stack Developer',
		jobList: [
			'Designing and implementing responsive and visually appealing user interfaces for a CRM application.',
			'Utilizing cutting-edge front-end technologies such as TypeScript, Next.js, and Tailwind CSS to create a seamless user experience.',
			'Design and implement RESTful APIs for seamless communication between the frontend and backend.',
			'Implement authentication and authorization mechanisms to ensure data security and user access control',
			'Implement and maintain CI/CD pipelines to automate the testing, building, and deployment processes.',
			'Orchestrate deployment workflows using Docker/Podman, ensuring consistency across various environments.',
		],
	},
	{
		company: 'Inovindo Digital Media',
		period: 'Jan 2019 – Mar 2019',
		role: 'Junior Web Developer Intern',
		jobList: [
			'Develop an e-commerce website for resellers.',
			'Deploy websites that have been finished by the dev team to web hosting services.',
			'Manage a company product list database.',
			'Publish articles for client’s company blog.',
			'Improve client’s website Search Engine Optimization.',
		],
	},
];

export type WorkExperience = (typeof contents)[number];

const WorkExperienceSection = () => {
	return (
		<div className='flex gap-16'>
			<div className='space-y-6'>
				<Title>Work Experience</Title>
				<div className='mx-6'>
					<ol className='relative border-l border-gray-200 dark:border-gray-700'>
						{contents.map((content, idx) => (
							<WorkExperienceListItem
								content={content}
								contentsLength={contents.length}
								idx={idx}
								key={content.period}
							/>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
};

export default WorkExperienceSection;
