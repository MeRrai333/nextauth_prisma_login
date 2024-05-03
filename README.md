<p>Using nextjs nextauth and prisma with postgresql</p>

<ul>
  <li><code style="color : red">npm install</code></li>
  <li>if using docker run <code style="color : red">docker-compose up -d</code> for starting Postgresql as database</li>
  <li>or not use docker change DATABASE_URL in .env file to your postgresql database</li>
  <li>run <code style="color : red">npx prisma migrage dev</code> for create table</li>
  <li>run <code style="color : red">npx prisma db seed</code> for seeding admin user</li>
  <li>Username must contain a-z, A-Z Number and length 6-16</li>
  <li>password must contain 1 a-z, 1 A-Z, 1 specical character and length between 8-32</li>
  <li><code style="color : red">npm run dev</code> for testing</li>
  <li>This project doesn't use revalidate for run in production because it's test project</li>
</ul>
