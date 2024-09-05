FROM node:22
COPY ./ /opt/app
RUN cd /opt/app && npm install
WORKDIR /opt/app
CMD ["npm", "start"]
